import { useState, useEffect } from 'react';
import { useWindowSize } from 'react-use';

export const SIZE_XS = { size: 'xs', width: 576 };
export const SIZE_SM = { size: 'sm', width: 768 };
export const SIZE_MD = { size: 'md', width: 992 };
export const SIZE_LG = { size: 'lg', width: 1200 };
export const SIZE_XL = { size: 'xl', width: 1440 };
export const SIZE_XXL = { size: 'xxl', width: 1441 };

const resolveBreakpoint = ( width ) => {
	if ( width < 576 ) {
        return SIZE_XS;
	} else if ( width >= 576 && width < 768 ) {
        return SIZE_SM;
	} else if ( width >= 768 && width < 992 ) {
        return SIZE_MD;
	} else if ( width >= 992 && width < 1200 ) {
        return SIZE_LG;
	} else if ( width >= 1200 && width < 1440 ) {
        return SIZE_XL;
	} else if ( width >= 1440 ) {
        return SIZE_XXL;
	}
};

const useBreakpoint = () => {
	const [size, setSize] = useState(() => resolveBreakpoint(window.innerWidth));
    const { width } = useWindowSize();
	
	useEffect(() => {
        setSize(resolveBreakpoint(width))
	}, [width]);
	
	return size;
};

export default useBreakpoint;