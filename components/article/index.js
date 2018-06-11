// TODO - consolidate global styles for text
export default function Article({title = null, children = null}) {
  return (
    <div className="bg-article">
      <style jsx global>{`
        .bg-article h2 {
          font-weight: 700;
          font-size: 38px;
          margin-top: 40px;
          margin-bottom: 70px;
        }

        .bg-article h3 {
          font-weight: 500;
          font-size: 28px;
          margin-top: 10px;
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
      `}</style>
      {children}
    </div>
  );
}