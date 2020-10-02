import * as React from 'react';

interface HoverImageProps {
  imagePath: string;
  hoverImagePath: string;
}

interface HoverImageState {
  src: string;
}

export default class HoverImage extends React.Component<HoverImageProps, HoverImageState> {
  private onMouseEnter: () => void;
  private onMouseLeave: () => void;

  public constructor(props: HoverImageProps) {
    super(props);
    this.state = {
      src: props.imagePath,
    };

    /* eslint-disable no-underscore-dangle -- temporary until we can replace with hooks */
    this.onMouseEnter = this._onMouseEnter.bind(this) as () => void;
    this.onMouseLeave = this._onMouseLeave.bind(this) as () => void;
    /* eslint-enable no-underscore-dangle */
  }

  public render(): JSX.Element {
    const { src } = this.state;
    return (
      <img
        alt=""
        role="presentation"
        src={src}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    );
  }

  private _onMouseEnter() {
    this.setState({
      src: this.props.hoverImagePath,
    });
  }

  private _onMouseLeave() {
    this.setState({
      src: this.props.imagePath,
    });
  }
}
