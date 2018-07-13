import React, { Component } from 'react';
import styled from 'styled-components';
import SmileFace from '@wisers/icons/SmileFace';
import NormalFace from '@wisers/icons/NormalFace';
import SadFace from '@wisers/icons/SadFace';
const ChartBarSentimentSection = styled.div`
  div {
    overflow: hidden;
    &.section-progress {
      margin-left: 6px;
      height: 15px;
      width: 100px;
      display: inline-block;
      background-color: #ccc;
      border-radius: 4px;
      > div {
        display: block;
        float: left;
        width: 0%;
        height: 100%;
        font-size: 12px;
        line-height: 18px;
        color: red;
        text-align: center;
        background-color: #082f90;
        transition: width 0.6s ease;
      }
      .Progress-positive {
        background-color: #1a93ff;
      }
      .Progress-neutral {
        background-color: #b2b9c8;
        border-radius: 0;
      }
      .Progress-negative {
        background-color: #f76666;
      }
    }
  }
`;
class Sentiment extends Component {
	constructor(props) {
    super(props);
    this.state = {
    };
  }    
  componentDidMount() {
      
  }
  render(){
    const { ...progressPercentage } = this.props;
    let showFaceType = null;
    if(progressPercentage.a >=0 && progressPercentage.b >= 0) {
      progressPercentage.a > progressPercentage.b ? 
      showFaceType = <SmileFace color="#1a93ff" /> :
      showFaceType = <NormalFace color="#b2b9c8" />
    } else if(progressPercentage.b >=0 && progressPercentage.c >= 0) {
      progressPercentage.b > progressPercentage.c ? 
      showFaceType = <NormalFace color="#b2b9c8" /> :
      showFaceType = <SadFace color="#f76666" />
    }

    return (
      <ChartBarSentimentSection>
        {showFaceType}
        <div className="section-progress">
          <div
            className="Progress-positive"
            style={{ width: `${progressPercentage.a}%` }}
          />
          <div
            className="Progress-neutral"
            style={{ width: `${progressPercentage.b}%` }}
          />
          <div
            className="Progress-negative"
            style={{ width: `${progressPercentage.c}%` }}
          />
        </div>
      </ChartBarSentimentSection>
    )
  }
}
 export default Sentiment;