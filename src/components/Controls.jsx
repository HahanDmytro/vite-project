import {useEffect} from 'react';
import {useControlsStore} from '../store/controlsStore';

export default function Controls() {
    const setKey = useControlsStore((s) => s.setKey);

    useEffect(() => {
        const down = (e) => {
            setKey(e.key, true);
            //console.log(e.key);
        }
        const up = (e) => setKey(e.key, false);
        window.addEventListener('keydown', down, );
        window.addEventListener('keyup', up);
        
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, [setKey]);

    return null;
}