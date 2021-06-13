import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../Gallery/Gallery';
import ADBanner from '../../components/AdBanner/AdBanner';
import { connect } from 'react-redux';
import classnames from 'classnames';
import wait from '@jam3/wait';
import checkProps from '@jam3/react-check-extra-props';

import './Home.scss';

import Transition from '../PagesTransitionWrapper';
import { setHomeLoaded } from '../../redux/modules/home';
import animate from '../../util/gsap-animate';

class Home extends React.PureComponent {
  componentDidMount() {
    animate.set(this.container, { autoAlpha: 0 });

    if (!this.props.loaded) {
      // await for data to be loaded here e.g. via fetch
      this.props.setHomeLoaded(true);
    }

    let array = [0, 1, 2, 3];
    this.generateSolutions(array, array.length - 1);
  }

  onAppear = () => {
    this.animateIn();
  };

  onEnter = async prevSectionExitDuration => {
    await wait(prevSectionExitDuration); // you need to remove this if you want to perform simultaneous transition
    this.animateIn();
  };

  onLeave = () => {
    this.animateOut();
  };

  animateIn = () => {
    animate.to(this.container, 0.3, { autoAlpha: 1 });
  };

  animateOut = () => {
    // Note that the total duration should match `exit` duration for the page inside `data/pages-transitions`
    animate.to(this.container, 0.3, { autoAlpha: 0 });
  };

  generateSolutions = (indicesData, n) => {
    if (n === 1) {
      let permutation = '';
      for (let i = 0; i < indicesData.length; i++) {
        permutation += indicesData[i] + ', ';
      }
      console.log(permutation);
    } else {
      for (let i = 0; i < n; i++) {
        this.generateSolutions(indicesData, n - 1);
        let swapIndex = n % 2 === 0 ? i : 0;
        [indicesData[swapIndex], indicesData[n - 1]] = [indicesData[n - 1], indicesData[swapIndex]];
      }
    }
  };

  render() {
    return (
      <section className={classnames('Home', this.props.className)} ref={el => (this.container = el)}>
        <header className="Home-header">
          <div className="home-header-wrapper">
            <div className="home-header-box big">
              <h1>Hot Sale</h1>
              <div className="box-info">
                <div className="box-info-image">
                  <img src="https://www.indiewire.com/wp-content/uploads/2019/12/avatar-2.jpg" alt="alt" />
                </div>
                <div className="box-info-data">
                  <h2>Immortal #4</h2>
                  <p>Edition 1 of 1</p>
                  <div className="box-info-status">
                    <div className="box-info-status-top">
                      <ul>
                        <li>
                          <p className="box-info-status-top-title">Highest Bid</p>
                          <p className="box-info-status-top-bid">200.00 Δ</p>
                          <p className="box-info-status-info">15,000 clicks</p>
                        </li>
                        <li>
                          <p className="box-info-status-top-title">Auction ending in</p>
                          <div className="box-info-status-top-counter">
                            <ul>
                              <li className="counter-day">3</li>
                              <li className="counter-hour">16</li>
                              <li className="counter-min">21</li>
                            </ul>
                          </div>
                          <div className="box-info-status-info">
                            <ul>
                              <li className="counter-info-day">Days</li>
                              <li className="counter-info-hour">Hours</li>
                              <li className="counter-info-min">Minutes</li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="box-info-status-bottom">
                      <button className="box-info-button cta">BID NOW</button>
                      <button className="box-info-button">How it works</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-header-box small-top">
              <ADBanner />
            </div>
            <div className="home-header-box small-bottom">
              <ADBanner />
            </div>
          </div>
        </header>
        <Gallery className="Home-galery" transitionState={this.props.transitionState} />
      </section>
    );
  }
}

Home.propTypes = checkProps({
  className: PropTypes.string,
  transitionState: PropTypes.string.isRequired,
  previousRoute: PropTypes.string,
  loaded: PropTypes.bool,
  setHomeLoaded: PropTypes.func
});

Home.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    previousRoute: state.previousRoute,
    loaded: state.homeLoaded.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHomeLoaded: val => dispatch(setHomeLoaded(val))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transition(Home));
