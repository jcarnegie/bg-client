import React from "react";
import PropTypes from "prop-types";

import style from "@/shared/constants/style";


class ItemSetDetailsCard extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.any,
    subtitle: PropTypes.any,
    itemImages: PropTypes.any,
    setDetails: PropTypes.any,
    buttonText: PropTypes.any,
  }
  static defaultProps = {
    onClick: () => {},
    title: null,
    subtitle: null,
    itemImages: null,
    setDetails: null,
    buttonText: null,
  }

  render() {
    return (
      <div className="item-set-details-card" onClick={this.props.onClick}>
        <style jsx>{`
          :global(.item-set-details-card img) {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
          .item-set-details-card {
            display: flex;
            flex-direction: column;
            box-shadow: ${style.boxShadow.default};
            border-radius: 5px;
            max-width: 300px;
            cursor: pointer;
            font-size: 0.8em;
          }
          .item-set-details-card:hover {
            box-shadow: ${style.boxShadow.hover};
          }
          :global(h5) {
            font-size: 1.1em;
            margin-bottom: 0;
          }
          button {
            border: 0;
            background-color: ${style.colors.secondary};
            color: white;
            font-weight: 100;
            padding: 10px 0;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            outline: 0;
          }
          .item-set-details-card-item-grid {
            background-color: rgb(243, 247, 255);
            display: flex;
            flex-wrap: wrap;
            padding: 1% 5px 3.5% 5px;
          }
          :global(.item-set-details-card-item-grid img) {
            margin: 2.5% 5% 0 5%;
            width: 40%;
            height: 10%;
            border-radius: 0;
          }
          :global(.item-set-details-card-item-grid img:nth-child(even)) {
            margin-left: 1.25%;
            margin-right: 8.75%;
          }
          :global(.item-set-details-card-item-grid img:nth-child(odd)) {
            margin-right: 1.25%;
            margin-left: 8.75%;
          }
          .item-set-details-card-item-details {
            background: white;
            padding: 0 0 0 10%;
          }
          .details {
            font-size: 0.9em;
            padding: 0;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
          }
          .item-set-details-card-subtitle {
            margin: 0 0 10px 0;
          }
          :global(.details li) {
            width: 50%;
            margin-bottom: 3px;
          }
        `}</style>
        <div className="item-set-details-card-item-grid">
          {this.props.itemImages}
        </div>
        <div className="item-set-details-card-item-details">
          <h5>{this.props.title}</h5>
          <p className="item-set-details-card-subtitle">{this.props.subtitle}</p>
          <ul className="details">
            {this.props.setDetails}
          </ul>
        </div>
        <button>{this.props.buttonText}</button>
      </div>
    );
  }

}

export default ItemSetDetailsCard;
