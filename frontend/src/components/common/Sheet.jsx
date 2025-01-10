import React from 'react';
import { Sheet as JoySheet, Typography } from '@mui/joy';
import PropTypes from 'prop-types';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  sheet: {
    width: 500,
    py: 3,
    px: 4,
    borderRadius: 'sm',
    boxShadow: 'sm',
  },
  title: {
    mb: 2,
  },
};

function Sheet({ title, children }) {
  return (
    <div style={styles.container}>
      <JoySheet
        variant="outlined"
        sx={styles.sheet}
      >
        <Typography level="h4" component="h1" sx={styles.title}>
          {title}
        </Typography>
        {children}
      </JoySheet>
    </div>
  );
}

Sheet.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Sheet;
