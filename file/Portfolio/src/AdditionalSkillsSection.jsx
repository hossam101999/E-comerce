import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { EmailForm } from "./EmailForm.jsx";
import ArrowDown from "./assets/arrow-down.svg";

const AdditionalSkillsSection = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section>
      <Container sx={{ py: 5 }}>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          mb: 4, // margin-bottom for spacing
        }}
      >
        Additional Technologies and Skills
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 4 
      }}>
        <Stack 
          direction="row" 
          spacing={4} 
          sx={{ 
            flexWrap: 'wrap', 
            justifyContent: 'center' 
          }}
        >
          {['GitHub', 'Responsive Design', 'Restful APIs'].map((skill, index) => (
            <Box 
              key={index} 
              sx={{ 
                backgroundColor: '#1976d2', 
                borderRadius: '8px', 
                padding: 2, 
                textAlign: 'center', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: 16,
                    height: 16,
                    background: 'linear-gradient(to top, #2196f3, #00bcd4)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: -24,
                    transform: 'translateY(-50%)',
                  },
                }}
              >
                {skill}
              </Typography>
            </Box>
          ))}
        </Stack>
        <Stack 
          direction="row" 
          spacing={4} 
          sx={{ 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            mt: 2 
          }}
        >
          {['Quick Learning', 'B1 English', 'Teamwork'].map((skill, index) => (
            <Box 
              key={index} 
              sx={{ 
                backgroundColor: '#1976d2', 
                borderRadius: '8px', 
                padding: 2, 
                textAlign: 'center', 
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: 16,
                    height: 16,
                    background: 'linear-gradient(to top, #2196f3, #00bcd4)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: -24,
                    transform: 'translateY(-50%)',
                  },
                }}
              >
                {skill}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>

      <EmailForm />

      <footer>
        <Container sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            hossam salah
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton
              href="https://www.linkedin.com/in/hossam-salah-1ab717238/"
              target="_blank"
              sx={{ color: '#0077b5', '&:hover': { color: '#0077b5' } }}
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </IconButton>
            <IconButton
              href="https://github.com/hossam101999"
              target="_blank"
              sx={{ color: '#0077b5', '&:hover': { color: '#0077b5' } }}
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </IconButton>
          </Stack>
        </Container>
      </footer>

      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            display: scrolling ? 'block' : 'none',
            backgroundColor: '#2196f3',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
            borderRadius: '50%',
            width: 64,
            height: 64,
            minWidth: 64,
            p: 0,
          }}
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={ArrowDown} alt="Scroll to top" style={{ width: 70, height: 70 }} />
        </Button>
      </Box>
    </section>
  );
};

export default AdditionalSkillsSection;
