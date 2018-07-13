import React, { Component } from 'react';
import styled from 'styled-components';

const Navbar = styled.div`
  overflow: hidden;
	.nav-menu {
    float: left;
    border-bottom: 1px solid #bfd5d5;
    display: block;
    margin: 0 10px 0 0;
    padding: 0;
    li {
      float: left;
      list-style: none;
      margin-right: 10px;
      a {
        display: block;
        padding: 0;
        line-height: 50px;
        height: 50px;
        margin: 0 15px;
        color: #76829e;
        font-size: 15px;
        cursor: pointer;
        text-decoration: none;
      }
      &.active {
        border-bottom: 3px solid #0ac8c8;
        background-color: transparent;
        a {
          color: #1e222a;
          font-weight: 500;
          cursor: default;
        }
      }
    }
  }
  .newsList {
  	clear: both;
  	float: left;
  	> div {
  		display: none;
  		&.active {
  			display: block;
  		}
  	}
  }
`;
class TabMenu extends Component {
	constructor(props) {
    super(props);
    this.state = {
      tabs:[
        {tabName:"热点新闻",id:1},
        {tabName:"合作播报",id:2},
        {tabName:"行业咨询",id:3},
        {tabName:"运营攻略",id:4}
      ],
      contents: [
      	{con: '第一个内容',id:1},
      	{con: '第二个内容',id:2},
      	{con: '第三个内容',id:3},
      	{con: '第四个内容',id:4},
      ],
      currentIndex:1,
    };
  }    
  componentDidMount() {
      
  }
  tabChoiced=(id,e)=>{
    // tab切换的方法
    this.setState({
        currentIndex:id
    });
  }
  render(){
    var _this = this;
    var tabList = this.state.tabs.map(function(res,index) {
      // 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
      var tabStyle = res.id === this.state.currentIndex ? 'active' : '';

      return <li key={index} onClick={this.tabChoiced.bind(_this,res.id)} className={tabStyle}><a>{res.tabName}</a></li>
				
    }.bind(_this));

    var conList = this.state.contents.map(function(res,index){
    	var conStyle = res.id === this.state.currentIndex ? 'active' : '';
    	return <div key={index} className={conStyle}>{res.con}</div>
    }.bind(_this));
    return (
      <Navbar>
        <ul className="nav-menu">
          {tabList}
        </ul>
        <div className="newsList">
            {conList}
        </div>
      </Navbar>
    )
  }
}
 //  constructor(props) {
 //    super(props);
 //    this.state = {
 //    	selectA: true,
 //    	selectB: false,
 //    };
 //  }
 //  ToggleClick(aa) {
 //  	// this.setState({ select: !this.state.select }); console.log('click');
 //  	if(aa) {

 //  	}
 //  }
 //  render() {
 //  	return (
 //  		<Navbar>
 //        <ul className="nav-menu">
 //          <li className={ this.state.selectA ? 'active' : '' } onClick={() => { this.ToggleClick(this.state.selectA); console.log('selectA',this.state.selectA); }}>
 //          	<a>帐号总览</a>
 //          </li>
 //          <li className={ this.state.selectB ? 'active' : '' } onClick={() => { this.ToggleClick(this.state.selectB); console.log('selectB',this.state.selectB); }}>
 //          	<a>内容分析</a>
 //          </li>
 //        </ul>
 //      </Navbar>
 //  	)
 //  }
 // }
 export default TabMenu;