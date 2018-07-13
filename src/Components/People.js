import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
import IIcon from '@wisers/icons/IIcon';
import IconFacebook from '@wisers/icons/Facebook';
import IconMultiColorInstagram from '@wisers/icons/MultiColorInstagram';
import IconYoutube from '@wisers/icons/Youtube';
import IconWeibo from '@wisers/icons/Weibo';
import IconWeChat from '@wisers/icons/WeChat';

const ChartBarPictorialItemWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: flex-start;
  flex-basis: 50%;
`;

const ChartWrapper = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
    min-height: 120px;
    flex-basis: 50%;
  }
`;

const ValWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => (props.pct < 0 ? 'flex-end' : 'center')};
  height: 100%;
  padding-left: 8px;
`;

const HumanBarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidePositive = styled.div`
  margin: 0 0 0 auto;
  width: 60px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  &.scale-active {
    &:hover {
      &::before {
        content: ' ';
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 0;
        width: 60px;
        background: repeating-linear-gradient(to top,#ccc 0,#ccc 1px,transparent 1px,transparent ${props => (100 / (props.count - 1))}%);
      }
      &::after {
        content: ' ';
        position: absolute;
        z-index: 1;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: #ccc;
      }
      > div:nth-child(2) {
        border-width: 2px;
      }
      > div:last-child {
        display: block;
      }
    }
  }
`;

const SidePositiveWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SideNegative = styled.div`
  width: 60px;
  max-height: 50%;
  height: ${props => -(props.pct < 0 ? props.pct * 50 : '0')}%;
  background-color: #f76666;
  margin: 0 0 0 auto;
  display: flex;
  flex-direction: column;
`;

const HumanBar = styled.div`
  position: absolute;
  flex-grow: 1;
  width: 60px;
  height: 100%;
  text-align: center;
  svg {
    height: 100%;
    rect {
      transition: height 0.5s cubic-bezier(0.49,0.46,0,1);
    }
  }
`;

const HumanLine = styled.div`
  &.state-active {
    position: absolute;
    z-index: 2;
    bottom: ${props => (props.avg / props.max) * 100}%;
    width: 66px;
    margin-left: -3px;
    height: 1px;
    border-top: 1px dashed #525d75;
  }
`;

const HumanYAxis = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  right: 100%;
  width: 100%;
  margin: -7px 0;
`;

const HumanYAxisList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: right;
  font-size: 11px;
  position: relative;
  height: 100%;
  margin-left: -5px;
  width: 100%;
`;

const HumanYAxisListItem = styled.li`
  width: 100%;
  position: absolute;
  bottom: ${props => (((props.idx / (props.count - 1))) * 88)}%;
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Heading = styled.div`
  flex-grow: 1;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  font-size: 14px;
  color: #1e222a;
  svg {
    margin-left: 5px;
    vertical-align: baseline;
  }
`;

const IconInfo = styled(IIcon)`
  display: inline-flex;
  color: #0ac8c8;
  margin-bottom: -2px;
  vertical-align: baseline;
`;

const Value = styled.div`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 400;
  line-height: 22px;
  color: ${props => (props.pct < 0 ? '#F76666' : '#0ac8c8')};
  > span {
    > span {
      display: block;
    }
    > span + span {
      font-size: 15px;
    }
  }
`;

const TooltipContentWrapper = styled.div`
  min-width: 220px;
  max-width: 300px;
  border: 1px solid #b2b9c8;
  opacity: 0.97;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 2px 1px 4px 0 rgba(30,34,42,0.5);
  padding: 8px 12px;
  font-size: 14px;
`;

const TooltipContentHeading = styled.div`
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  > svg {
    margin-bottom: -2px;
  }
  svg + span {
    margin-left: 5px;
  }
`;

const TooltipContentBody = styled.div`
  margin-bottom: 8px;
  padding-left: 19px;
  > table {
    > tbody {
      > tr {
        > td:nth-child(2) {
          padding-left: 12px;
        }
        > td:last-child {
          text-align: right;
          white-space: nowrap;
          font-weight: 600;
          padding-left: 12px;
        }
      }
    }
  }
`;

const TooltipContentFooter = styled.div`
  padding-left: 19px;
  color: #525d75;
  font-size: 12px;
  font-style: italic;
  svg + span {
    margin-left: 5px;
  }
`;

const IconSquare = styled.i`
  width: 12px;
  display: inline-block;
  &::before {
    content: '';
    display: inline-block;
    width: 9px;
    height: 9px;
    border: 1px solid ${props => props.borderColor};
    background-color: ${props => props.bgColor};
    border-radius: 1px;
  }
`;
const IconDashed = styled.i`
  display: inline-flex;
  width: 12px;
  height: 9px;
  border-top: 1px dashed ${props => props.borderColor};
  padding-bottom: 5px;
`;

const Table = styled.table`
  width: 100%;
`;
const TableBody = styled.tbody`
  display: table-row-group;
`;
const TableRow = styled.tr`
  display: table-row;
`;
const TableData = styled.td`
  vertical-align: top;
  word-wrap: break-word;
  word-break: break-word;
`;

const HumanYAxisListItemWrapper = props => (
  <HumanYAxisListItem count={props.count} idx={props.index} >
    {props.yAxisData}
  </HumanYAxisListItem>
);

HumanYAxisListItemWrapper.propTypes = {
  count: PropTypes.number,
  index: PropTypes.number,
  yAxisData: PropTypes.string,
};

const TooltipContentInfo = props => (
  <TooltipContentWrapper>
    <Table>
      <TableBody>
        <TableRow>
          <TableData>
            <IconInfo color="#0ac8c8" />
          </TableData>
          <TableData>
            {props.headingTips}
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  </TooltipContentWrapper>
);

TooltipContentInfo.propTypes = {
  headingTips: PropTypes.string,
};

const TooltipContentDataGrowth = props => (
  <TooltipContentWrapper>
    <TooltipContentHeading>
      {props.icon}
      <span>{props.name}</span>
    </TooltipContentHeading>
    <TooltipContentBody>
      <Table>
        <TableBody>
          <TableRow>
            <TableData>
              <IconSquare borderColor="#979797" bgColor="#edeff3" />
            </TableData>
            <TableData>
              <span>
                {props.maxTitle}
              </span>
            </TableData>
            <TableData>
              <span>{
                  props.format ? props.format(props.maxpct) : props.maxpct
                }
              </span>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              {
                props.pct < 0 ?
                  <IconSquare borderColor="#f76666" bgColor="#f76666" /> :
                  <IconSquare borderColor="#0ac8c8" bgColor="#0ac8c8" />
              }
            </TableData>
            <TableData>
              <span>
                {props.valTitle}
              </span>
            </TableData>
            <TableData>
              <span>
                {
                  props.format ? props.format(props.valpct) : props.valpct
                }
              </span>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <IconDashed borderColor="#525d75" />
            </TableData>
            <TableData>
              <span>
                {props.avgTitle}
              </span>
            </TableData>
            <TableData>
              <span>{
                  props.format ? props.format(props.avgpct) : props.avgpct
                }
              </span>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </TooltipContentBody>
    <TooltipContentFooter>
      <div>
        <IconInfo color="#525d75" />
        <span>{props.footer}</span>
      </div>
    </TooltipContentFooter>
  </TooltipContentWrapper>
);

TooltipContentDataGrowth.propTypes = {
  icon: PropTypes.element,
  name: PropTypes.string,
  pct: PropTypes.number,
  maxpct: PropTypes.number,
  valpct: PropTypes.number,
  avgpct: PropTypes.number,
  maxTitle: PropTypes.string,
  valTitle: PropTypes.string,
  avgTitle: PropTypes.string,
  footer: PropTypes.string,
  format: PropTypes.func,
};

const TooltipContentDataCount = props => (
  <TooltipContentWrapper>
    <TooltipContentHeading>
      {props.icon}
      <span>{props.name}</span>
    </TooltipContentHeading>
    <TooltipContentBody>
      <Table>
        <TableBody>
          <TableRow>
            <TableData>
              <IconSquare borderColor="#979797" bgColor="#edeff3" />
            </TableData>
            <TableData>
              <span>
                {props.maxTitle}
              </span>
            </TableData>
            <TableData>
              <span>{
                props.format ? props.format(props.maxpct) : props.maxpct
              }
              </span>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <IconSquare borderColor="#0ac8c8" bgColor="#0ac8c8" />
            </TableData>
            <TableData>
              <span>
                {props.valTitle}
              </span>
            </TableData>
            <TableData>
              <span>
                {
                props.format ? props.format(props.valpct) : props.valpct
              }
              </span>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              <IconDashed borderColor="#525d75" />
            </TableData>
            <TableData>
              <span>
                {props.avgTitle}
              </span>
            </TableData>
            <TableData>
              <span>{
                props.format ? props.format(props.avgpct) : props.avgpct
              }
              </span>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </TooltipContentBody>
    <TooltipContentFooter>
      <div>
        <IconInfo color="#525d75" />
        <span>{props.footer}</span>
      </div>
    </TooltipContentFooter>
  </TooltipContentWrapper>
);

TooltipContentDataCount.propTypes = {
  icon: PropTypes.element,
  name: PropTypes.string,
  maxpct: PropTypes.number,
  valpct: PropTypes.number,
  avgpct: PropTypes.number,
  maxTitle: PropTypes.string,
  valTitle: PropTypes.string,
  avgTitle: PropTypes.string,
  footer: PropTypes.string,
  format: PropTypes.func,
};

class ChartBarPictorialItem extends Component {
  formatterNumber(s) {
    let num = this.props.format(s);
    num = s < 0 ? `- ${num}` : num;
    return num;
  }
  formatterSiderNumber(s) {
    let num = this.props.siderFormat(s);
    num = s < 0 ? `- ${num}` : num;
    return num;
  }
  renderIcon() {
    switch (this.props.barData.pub) {
      case 'weibo':
        return <IconWeibo color="#ba0a0a" />;
      case 'facebook':
        return <IconFacebook color="#4267b2" />;
      case 'instagram':
        return <IconMultiColorInstagram />;
      case 'youtube':
        return <IconYoutube color="#ff0000" />;
      case 'wechat':
        return <IconWeChat color="#00c850" />;
      default:
        return '';
    }
  }
  render() {
    let rightSider = '';
    if (this.props.barData.val !== 0) {
      let perct = `${((this.props.barData.pct) * 100)}`;
      if (perct.indexOf('.') > -1) {
        perct = Number(perct).toFixed(1);
      }
      const rightPct = this.props.barData.type === 'growth' ? `${perct}%` : '';
      const { valpct } = this.props.barData;
      const rightNmb = this.props.barData.type === 'growth' ? `(${this.formatterSiderNumber(valpct)})` : this.formatterSiderNumber(valpct);
      rightSider = (rightPct !== '' ? <span><span>{rightPct}</span><span>{rightNmb}</span></span> : <span>{rightNmb}</span>);
    }
    const items = [];
    const yAxisCount = this.props.barData.yAxis.length;
    let itt = 0;
    this.props.barData.yAxis.forEach((item, idx) => {
      itt = this.props.siderFormat(+item);
      items.push(<HumanYAxisListItemWrapper
        yAxisData={itt}
        count={yAxisCount}
        index={idx}
      />);
    });
    const yAxisChilds = React.Children.toArray(items);
    return (
      <ChartBarPictorialItemWrapper>
        <HeadingWrapper>
          <Heading>
            <span>{this.props.barData.heading}</span>
            {
              this.props.barData.headingTips !== '' &&
                <Tooltip
                  position="top"
                  trigger="mouseenter"
                  delay="50"
                  html={(
                    <TooltipContentInfo {...this.props.barData} />
                  )}
                >
                  <IconInfo color="#b2b9c8" />
                </Tooltip>
            }
          </Heading>
        </HeadingWrapper>
        <Tooltip
          position="bottom"
          trigger="mouseenter"
          followCursor="true"
          delay="150"
          html={
            this.props.barData.type === 'growth' ?
              (<TooltipContentDataGrowth
                {...this.props.barData}
                icon={this.renderIcon()}
                format={s => this.formatterNumber(s)}
              />) :
              (<TooltipContentDataCount
                {...this.props.barData}
                icon={this.renderIcon()}
                format={s => this.formatterNumber(s)}
              />)
          }
        >
          <ChartWrapper>
            <div>
              <HumanBarWrapper>
                <SidePositiveWrapper>
                  <SidePositive className={(this.props.barData.val < 0 ? '' : 'scale-active')} count={yAxisCount}>
                    <HumanBar {...this.props.barData}>
                      <svg viewBox="0 0 4.5 10" >
                        <defs>
                          <path width="60" height="120" d="M0.362217043,2.54181442 C0.600646961,2.33127738 0.883105132,2.22222222 1.212809,2.22313102 L3.30567503,2.22313102 C3.64875672,2.22313102 3.92833612,2.33127738 4.16168585,2.54272321 C4.40096247,2.76189378 4.51679064,3.01877926 4.51679064,3.30308 L4.51679064,5.93827668 C4.51679064,6.03718365 4.47462512,6.12639683 4.40807472,6.19864587 C4.33441207,6.26998612 4.2361952,6.30224827 4.1064812,6.30224827 C3.99590255,6.30224827 3.89429889,6.26998612 3.80658107,6.19864587 C3.73291841,6.12639683 3.69786515,6.03703218 3.69786515,5.93827668 L3.69786515,3.58177651 L3.4751838,3.58177651 L3.4751838,9.50013927 C3.4751838,9.62585563 3.42776876,9.7418782 3.32430237,9.83124284 C3.21389306,9.93014981 3.09095263,9.97240868 2.95073958,9.97240868 C2.78580298,9.97240868 2.65083945,9.92999834 2.54652636,9.83124284 C2.44289063,9.7418782 2.38768598,9.62570416 2.38768598,9.50013927 L2.38768598,6.3240593 L2.14925606,6.3240593 L2.14925606,9.50013927 C2.14925606,9.62585563 2.09913158,9.7418782 1.98872228,9.83124284 C1.88440919,9.93014981 1.75638858,9.97240868 1.59687083,9.97240868 C1.44954553,9.97240868 1.32152492,9.92999834 1.21196231,9.83124284 C1.09528744,9.7418782 1.03398656,9.62570416 1.03398656,9.50013927 L1.03398656,3.58177651 L0.820957561,3.58177651 L0.820957561,5.93827668 C0.820957561,6.03718365 0.784888262,6.12639683 0.716475132,6.19864587 C0.637562957,6.26998612 0.539346087,6.30224827 0.411325478,6.30224827 C0.300069471,6.30224827 0.201852602,6.26998612 0.122940427,6.19864587 C0.0377626931,6.12639683 0,6.03703218 0,5.93827668 L0,3.30292853 C0,3.01787047 0.122940427,2.76189378 0.362217043,2.54181442 Z M2.25491801,1.76140601 C2.00602666,1.76140601 1.79598053,1.6820634 1.63699707,1.51655471 C1.4683023,1.34707889 1.38888889,1.13682096 1.38888889,0.8829246 C1.38888889,0.641405685 1.4683023,0.434321465 1.63699707,0.263417476 C1.79504073,0.087594245 2.00508686,0 2.25491801,0 C2.49190518,0 2.70116814,0.087594245 2.87064608,0.263417476 C3.03934085,0.434321465 3.12611606,0.641405685 3.12611606,0.8829246 C3.12611606,1.13618622 3.04012402,1.34644415 2.87142925,1.51655471 C2.70257785,1.6820634 2.49268835,1.76140601 2.25491801,1.76140601 Z" id="path-1" />
                        </defs>
                        <mask id="mask-2" fill="white">
                          <use xlinkHref="#path-1" />
                        </mask>
                        <use id="Mask" fill="#0ac8c8" xlinkHref="#path-1" />
                        <rect fill="#edeff3" mask="url(#mask-2)" width="60" height={this.props.barData.pct < 0 ? 10 : 10 - ((this.props.barData.val / this.props.barData.max) * 10)} />
                      </svg>
                    </HumanBar>
                    <HumanLine className={(this.props.barData.val < 0 ? '' : 'state-active')} {...this.props.barData} />
                    <HumanYAxis>
                      <HumanYAxisList>
                        {yAxisChilds}
                      </HumanYAxisList>
                    </HumanYAxis>
                  </SidePositive>
                </SidePositiveWrapper>
                <SideNegative {...this.props.barData} />
              </HumanBarWrapper>
            </div>
            <div>
              <ValWrapper {...this.props.barData}>
                <Value {...this.props.barData}>
                  {rightSider}
                </Value>
              </ValWrapper>
            </div>
          </ChartWrapper>
        </Tooltip>
      </ChartBarPictorialItemWrapper>
    );
  }
}

ChartBarPictorialItem.propTypes = {
  barData: PropTypes.shape({
    type: PropTypes.string,
    heading: PropTypes.string,
    headingTips: PropTypes.string,
    name: PropTypes.string,
    pub: PropTypes.string,
    max: PropTypes.number,
    val: PropTypes.number,
    avg: PropTypes.number,
    pct: PropTypes.number,
    maxpct: PropTypes.number,
    valpct: PropTypes.number,
    avgpct: PropTypes.number,
    maxTitle: PropTypes.string,
    valTitle: PropTypes.string,
    avgTitle: PropTypes.string,
    footer: PropTypes.string,
    yAxis: PropTypes.array,
  }),
  format: PropTypes.func,
  siderFormat: PropTypes.func,

};

export default ChartBarPictorialItem;
