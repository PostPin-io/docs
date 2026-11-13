// Makes <Screenshot> and <Email> available in every doc and page without an import
import MDXComponents from '@theme-original/MDXComponents';
import Screenshot from '@site/src/components/Screenshot';
import Email from '@site/src/components/Email';

export default {
  ...MDXComponents,
  Screenshot,
  Email,
};
