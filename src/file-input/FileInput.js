/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paperclip } from '../icons/Icons';

import s from './FileInput.scss';

export default class FileInput extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  };

  state = {
    fileNames: '',
  }

  onFilesChange = (e) => {
    const { files } = e.target;

    if (this.props.onChange) {
      this.props.onChange(e);
    }


    const names = Object.values(files).reduce(
      (arr, cur) => [...arr, cur.name],
      [],
    ).join(', ');

    this.setState({
      fileNames: names,
    }, () => {
      if (this.state.fileNames !== '') {
        this.props.onFocus();
      } else {
        this.props.onBlur();
      }
    });
  };

  render() {
    const { onChange, placeholder, ...rest } = this.props;

    return (
      <div className={s.files}>
        <label
          htmlFor="attachments"
          className={s.files__label}
        >
          {this.state.fileNames || placeholder}
        </label>
        <input
          tabIndex="0"
          type="file"
          name="attachments"
          id="attachments"
          className={s.files__input}
          onChange={this.onFilesChange}
        />
        <Paperclip className={s.files__paperclip} />
      </div>
    );
  }
}
