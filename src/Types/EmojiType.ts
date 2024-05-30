export interface EmojiType {
    activeSkinTone: string,
    emoji: string,
    getImageUrl: () => void,
    imageUrl: string, 
    inCustom: boolean,
    names: Array<string>,
    unified: string,
    unifiedWithoutSkinTone: string
}
