import Layout from '@/components/layouts';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import FAQ from '@/components/faq';

@connect(
  state => ({
    responsive: state.responsive,
  })
)
class FAQPage extends Component {
  render() {
    return (
      <Layout>
        <Layout.Content>
          <FAQ />
        </Layout.Content>
      </Layout>
    );
  }
}

export default FAQPage;
