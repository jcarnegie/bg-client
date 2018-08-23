import ClipLoader from 'react-spinners/dist/spinners/ClipLoader';


const DataLoading = props => (
  <div className="loading-page">
    <style jsx>{`
      .loading-page {
        text-align: center;
        height: 100%;
      }
    `}</style>
    <ClipLoader />
  </div>
);


export default DataLoading;
