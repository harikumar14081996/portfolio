import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Settings, 
  BarChart3, 
  Layout, 
  Cpu, 
  Database, 
  Smartphone, 
  Cloud, 
  Code2, 
  Search, 
  Layers,
  BrainCircuit,
  Share2,
  Workflow,
  Globe,
  Rocket
} from 'lucide-react';

const IconContainer = ({ children }) => (
  <motion.div 
    className="animated-icon-container"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    style={{ 
      width: '40px', 
      height: '40px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--accent-primary)',
      marginBottom: '16px'
    }}
  >
    {children}
  </motion.div>
);

export const AIIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <BrainCircuit size={32} />
    </motion.div>
  </IconContainer>
);

export const AutomationIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      <Workflow size={32} />
    </motion.div>
  </IconContainer>
);

export const MarketingIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        y: [0, -5, 0],
        scaleY: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 2.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Rocket size={32} />
    </motion.div>
  </IconContainer>
);

export const FrontendIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        borderColor: ["var(--accent-primary)", "var(--text-muted)", "var(--accent-primary)"] 
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Layout size={32} />
    </motion.div>
  </IconContainer>
);

export const BackendIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        boxShadow: ["0 0 0px var(--accent-glow)", "0 0 15px var(--accent-glow)", "0 0 0px var(--accent-glow)"] 
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Layers size={32} />
    </motion.div>
  </IconContainer>
);

export const DatabaseIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        scaleX: [1, 0.9, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <Database size={32} />
    </motion.div>
  </IconContainer>
);

export const MobileIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        rotate: [0, -5, 5, 0]
      }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <Smartphone size={32} />
    </motion.div>
  </IconContainer>
);

export const CloudIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        y: [2, -2, 2]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Cloud size={32} />
    </motion.div>
  </IconContainer>
);

export const LogicIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Code2 size={32} />
    </motion.div>
  </IconContainer>
);

export const ResearchIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        scale: [1, 0.95, 1],
        rotate: [0, 90, 180, 270, 360]
      }}
      transition={{ 
        scale: { duration: 2, repeat: Infinity },
        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
      }}
    >
      <Search size={32} />
    </motion.div>
  </IconContainer>
);

export const IntegrationsIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        strokeDashoffset: [0, 10]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <Share2 size={32} />
    </motion.div>
  </IconContainer>
);

export const DigitalPresenceIcon = () => (
  <IconContainer>
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Globe size={32} />
    </motion.div>
  </IconContainer>
);
