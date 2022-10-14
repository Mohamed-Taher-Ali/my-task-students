import React from 'react';
import { Layout } from 'antd';

export default function MyContent({ content }) {

  return (
    <Layout.Content
      className="site-layout"
      style={styles.ext}
    >
      <div
        className="site-layout-background"
        style={styles.int}
      >
        {content}
      </div>
    </Layout.Content>
  );
}

const styles = {
  ext: {
    padding: '0 50px',
    marginTop: 64,
  },
  int: {
    padding: 24,
    minHeight: 1200,
  }
}