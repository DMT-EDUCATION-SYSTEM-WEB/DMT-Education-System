import { motion } from 'framer-motion';
import { animated, useSpring } from 'react-spring';
import { useEffect, ReactNode } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  [key: string]: any;
}

// Animation components using framer-motion
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }: AnimationProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideUp = ({ children, delay = 0, duration = 0.5, ...props }: AnimationProps) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInLeft = ({ children, delay = 0, duration = 0.5, ...props }: AnimationProps) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInRight = ({ children, delay = 0, duration = 0.5, ...props }: AnimationProps) => (
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, duration = 0.5, ...props }: AnimationProps) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

interface PulseProps {
  children: ReactNode;
  [key: string]: any;
}

export const Pulse = ({ children, ...props }: PulseProps) => (
  <motion.div
    animate={{ 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "reverse" 
      } 
    }}
    {...props}
  >
    {children}
  </motion.div>
);

export const Bounce = ({ children, ...props }: PulseProps) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      transition: { 
        duration: 1, 
        ease: "easeInOut", 
        repeat: Infinity, 
        repeatType: "reverse" 
      } 
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Hover effects
interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  [key: string]: any;
}

export const HoverScale = ({ children, scale = 1.05, ...props }: HoverScaleProps) => (
  <motion.div
    whileHover={{ scale }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    {...props}
  >
    {children}
  </motion.div>
);

export const HoverElevate = ({ children, ...props }: PulseProps) => (
  <motion.div
    whileHover={{ 
      y: -5, 
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" 
    }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    {...props}
  >
    {children}
  </motion.div>
);

// React-spring animations
interface SpringProps {
  children: ReactNode;
  delay?: number;
  [key: string]: any;
}

export const SpringFadeIn = ({ children, delay = 0, ...props }: SpringProps) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: { tension: 280, friction: 60 }
  });

  return (
    <animated.div style={styles} {...props}>
      {children}
    </animated.div>
  );
};

export const SpringSlideUp = ({ children, delay = 0, ...props }: SpringProps) => {
  const styles = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay,
    config: { tension: 280, friction: 60 }
  });

  return (
    <animated.div style={styles} {...props}>
      {children}
    </animated.div>
  );
};

// Initialize AOS
export const initAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
      offset: 50
    });
  }, []);
};
