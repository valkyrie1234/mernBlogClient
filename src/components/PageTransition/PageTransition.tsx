import React, { ReactNode } from 'react';
import { motion } from 'framer-motion'

interface IPageTransition {
    children: ReactNode;
}

const PageTransition: React.FC<IPageTransition> = ({ children }): React.JSX.Element => {
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -130,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: 130,
            }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;