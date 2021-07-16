import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={keywords}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Bem vindo ao Comércio Moz",
  description: "Vendemos os melhores produtos a bom preço",
  keywords: "electronics, compra electronicos, barato",
};

export default Meta;
