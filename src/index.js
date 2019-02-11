import React, { Component } from 'react';
import PropType from 'prop-types';
import './index.css';

const WatchableStore = require('watchable-store');
const DEFAULT_TIME = 3000;

const BackgroundColor = {
  success: {
    backgroundColor: "#2ecc71"
  },
  info: {
    backgroundColor: "#61dafb"
  },
  warning: {
    backgroundColor: "#f1c40f"
  },
  error: {
    backgroundColor: "#e74c3c"
  }
};

const LightBackgroundColor = {
  success: {
    color: '#468847',
    backgroundColor: '#dff0d8',
    borderColor: '#d6e9c6',
  },
  info: {
    color: '#3a87ad',
    backgroundColor: '#d9edf7',
    borderColor: '#bce8f1',
  },
  warning: {
    color: '#c09853',
    backgroundColor: '#fcf8e3',
    borderColor: '#fbeed5',
  },
  error: {
    color: '#b94a48',
    backgroundColor: '#f2dede',
    borderColor: '#eed3d7',
  }
}

const Store = () => {
  const store = WatchableStore({
    action: '',
    message: ''
  });

  ['success', 'info', 'warning', 'error'].forEach(status => {
    store[status] = (message, className) => {
      store.data = {
        status,
        message,
        className
      };
    };
  });

  return store;
};

export class SmartToaster extends Component {
  static POSITION = {
    TOP_LEFT: "top_left",
    TOP_RIGHT: "top_right",
    BOTTOM_LEFT: "bottom_left",
    BOTTOM_RIGHT: "bottom_right",
    TOP_CENTER: "top_center",
    BOTTOM_CENTER: "bottom_center",
  };

  constructor(props) {
    super(props);

    this.state = {
      styles: {},
      toasts: []
    };
  }

  componentDidMount() {
    const {
      store,
      fadeOutTimer,
      position
    } = this.props;
    this.storeConfig = store.watch(data => {
      let toast = Object.assign({}, { ...data, id: Math.random() });
      this.setState({ toasts: [toast].concat(this.state.toasts) });
      setTimeout(() => {
        this.setState({ toasts: this.state.toasts.filter(t => t.id !== toast.id) });
      }, fadeOutTimer);
    });

    let styles = {};
    switch (position) {
      case SmartToaster.POSITION.TOP_LEFT:
        styles.top = 10;
        styles.left = 10;
        break;
      case SmartToaster.POSITION.TOP_RIGHT:
        styles.top = 10;
        styles.right = 10;
        break;
      case SmartToaster.POSITION.TOP_CENTER:
        styles.top = 10;
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        break;
      case SmartToaster.POSITION.BOTTOM_LEFT:
        styles.bottom = 10;
        styles.left = 10;
        break;
      case SmartToaster.POSITION.BOTTOM_RIGHT:
        styles.bottom = 10;
        styles.right = 10;
        break;
      case SmartToaster.POSITION.BOTTOM_CENTER:
        styles.bottom = 10;
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
        break;
      default:
        styles.top = 10;
        styles.right = 10;
        break;
    }
    this.setState({ styles: styles });
  }

  componentWillUnmount() {
    this.props.store.unwatch(this.storeConfig);
  }

  render() {
    const { lightBackground, className } = this.props;
    const { toasts, styles } = this.state;
    const style = lightBackground ? LightBackgroundColor : BackgroundColor;
    return (
      <div style={styles} className={"toasts-holder " + (className || '')}>
        {
          toasts.map(toast => {
            return (
              <div
                key={toast.id}
                className={'toastSlide toast-' + toast.status + ' ' + toast.className}
                style={style[toast.status]}
              >
                {toast.message}
              </div>
            );
          })
        }
      </div>
    );
  }
}

SmartToaster.propTypes = {
  store: PropType.object.isRequired,
  position: PropType.string,
  lightBackground: PropType.bool,
  fadeOutTimer: PropType.number,
};

SmartToaster.defaultProps = {
  store: {},
  position: PropType.string,
  lightBackground: false,
  fadeOutTimer: DEFAULT_TIME
};

export const toast = Store();
