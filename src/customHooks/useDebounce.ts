import React from 'react'

function useDebounce(value:string | undefined, delay:number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(timer);
            };
        },
        [value, delay] 
    );
    return debouncedValue;
}

export default useDebounce;