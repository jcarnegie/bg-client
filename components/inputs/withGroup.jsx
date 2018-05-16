import React, {Component} from "react";
import PropTypes from "prop-types";
import {omit} from "lodash";
import {Col, ControlLabel, FormGroup, Glyphicon, HelpBlock} from "react-bootstrap";
import {FormattedMessage} from "react-intl";


export default function withGroup(Input) {
  return class InputWithGroup extends Component {
    static propTypes = {
      name: PropTypes.string,
      required: PropTypes.bool,
      validation: PropTypes.shape({
        name: PropTypes.string,
        reason: PropTypes.string
      }),
      children: PropTypes.node
    };

    render() {
      const {required, validation} = this.props;
      const props = omit(this.props, ["validation"]);
      return (
        <FormGroup controlId={this.props.name} validationState={validation ? "error" : null}>
          <Col componentClass={ControlLabel}>
            <FormattedMessage id={`fields.${this.props.name}.label`} />
            {required ? <sup><Glyphicon glyph="asterisk" /></sup> : null}
          </Col>
          <Col>
            <Input {...props} />
            {validation ? <HelpBlock><FormattedMessage id={`fields.${validation.name}.${validation.reason}`} /></HelpBlock> : null}
          </Col>
        </FormGroup>
      );
    }
  };
}
