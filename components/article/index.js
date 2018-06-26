// TODO - consolidate global styles for text
import PropTypes from "prop-types";


function Article({
  title = null,
  children = null,
}) {
  return (
    <div className="bg-article">
      <style jsx global>{`
        .bg-article h2 {
          font-weight: 700;
          font-size: 38px;
          margin: 0 0 40px 0;
          margin-bottom: ;
        }

        .bg-article h3,
        .bg-article h3 span,
        .bg-article h3 span strong {
          font-weight: 500;
          font-size: 28px;
          margin-bottom: 40px;
        }
        .bg-article p,
        .bg-article ul {
          margin-bottom: 35px;
        }
        .bg-article p,
        .bg-article li {
          font-weight: 300;
        }
        .bg-article img {
          margin: 60px auto 0 auto;
          margin-bottom: 40px;
          display: block;
        }
        .bg-article .article-inline-image {
          margin: 0;
          vertical-align: middle;
        }
        .bg-article ul {
          list-style: none;
        }
        .bg-article ul li {
          margin-bottom: 10px;
        }
        .bg-article strong {
          font-weight: 600;
        }
        .bg-article p,
        .bg-article li,
        .bg-article strong {
          font-size: 18px;
        }
        .bg-article dl {
          font-size: 18px;
        }
        .bg-article dl dt {
          font-weight: 600;
        }
        .bg-article dl dd {
          font-weight: 300;
          margin-bottom: 20px;
        }
        .bg-article .row {
          margin-bottom: 60px;
        }
        .bg-article .nav-tabs li {
          margin: 0;
        }
      `}</style>
      {children}
    </div>
  );
}

Article.propTypes = {
  children: PropTypes.array,
  title: PropTypes.any,
};

export default Article;
