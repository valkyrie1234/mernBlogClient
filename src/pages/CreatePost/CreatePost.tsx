import React from 'react';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Input, Image } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import styles from './CreatePost.module.scss';
import 'easymde/dist/easymde.min.css';
import PageTransition from '../../components/PageTransition/PageTransition';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import { postsApi } from '../../store/Api/PostApi';

const CreatePost: React.FC = () => {
    const { id } = useParams()
    const isEditing = Boolean(id)
    const navigate = useNavigate()

    const [imageUrl, setImageUrl] = React.useState<string>('')
    const [title, setTitle] = React.useState<string>('')
    const [text, setText] = React.useState<string>('')
    const [tags, setTags] = React.useState<Array<string>>([])
    const inputFileRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        setTimeout(() => {
            if (id) {
                axios.get(`post/${id}`).then(({ data }) => {
                    setTitle(data.title);
                    setText(data.text);
                    setTags(data.tags.join(','));
                    setImageUrl(data.imageUrl);
                }).catch((error) => {
                    alert(error)
                })
            }
        }, 1000)
    }, [])




    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
        }),
        [],
    );

    const handleChangeTitle = (event: any): void => {
        setTitle(event.target.value)
    }

    const handleAddTags = (event: any): void => {
        setTags(event.target.value.split(','))
    }

    const handleChangeText = React.useCallback((text: string) => {
        setText(text);
    }, []);




    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0]
            formData.append('image', file)
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url)
        } catch (error) {
            console.log(error)
        }
    }

    const onClickRemoveImage = (): void => {
        setImageUrl('')
    }

    const [createPost] = postsApi.useCreatePostMutation()

    const onSubmit = async () => {
        // try {
        const fields = {
            title,
            text,
            imageUrl,
            tags,
        }

        //     const { data } = isEditing
        //         ? await axios.patch(`/post/${id}`, fields)
        //         : await axios.post('/post', fields);

        //     const _id = isEditing ? id : data._id;
        //     navigate(`/post/${_id}`)

        // } catch (error) {
        //     console.log(error)
        // }

        

        navigate(`/`)
        createPost(fields)
        
    }



    return (
        <div>
            <MemoizedMyHeader />
            <PageTransition>
                <Row>
                    <Col span={12} offset={6} style={{ marginTop: 10 }}>
                        <Card
                            cover={imageUrl ? <Image height={300} style={{ objectFit: "cover" }} src={`http://localhost:4444${imageUrl}`} /> : ''}
                        >
                            <Button
                                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                                style={{ borderRadius: 0 }}
                            >Загрузить превью</Button>
                            {
                                imageUrl ? (
                                    <Button
                                        onClick={() => onClickRemoveImage()}
                                        danger
                                        style={{ marginLeft: 10, borderRadius: 0 }}
                                    >
                                        Отменить
                                    </Button>
                                ) :
                                    ''
                            }
                            <input ref={inputFileRef} onChange={handleChangeFile} type="file" hidden />
                            <br />
                            <br />
                            <Input
                                onChange={handleChangeTitle}
                                placeholder='Введите заголовок статьи'
                                style={{ border: 0, borderRadius: 0 }}
                                size='large'
                                value={title}
                            />
                            <br />
                            <br />
                            <Input placeholder='Введите теги'
                                style={{ border: 0, borderRadius: 0, borderBottom: "1px solid gray" }}
                                onChange={handleAddTags}
                                value={tags}
                            />
                            <br />
                            <br />
                            <SimpleMDE
                                value={text}
                                options={options}
                                onChange={handleChangeText}
                                className={styles.editor}
                            />
                            <br />
                            <br />
                            <Button type='primary' style={{ borderRadius: 0 }} onClick={onSubmit}>{isEditing ? "Сохранить" : "Опубликовать"}</Button>
                            <Button type='link' danger style={{ borderRadius: 0, marginLeft: 5 }}>Отмена</Button>
                        </Card>
                    </Col>
                </Row>
            </PageTransition>
        </div>
    );
}

export default CreatePost;