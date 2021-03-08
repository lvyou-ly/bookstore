import React from "react";
import "./sass/chart.scss";
import { connect } from "react-redux";
import { reqGetUser } from "../../api/index";
import { changeBookDetail, updateChartAsync, updateToBuy } from "../../redux/action";
import { NavBar, Icon, Toast } from 'antd-mobile';
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: [],
            toBuy: false,
            backToMain: false,
            selectAll: false,
        }
    }
    async componentDidMount() {
        let chart = null;
        if (this.props.chart) {
            chart = this.props.chart;
        } else {
            let response = await reqGetUser();
            chart = response.data.chart;
        }
        // 添加selected属性，表示商品是否被选中，调用接口时要把此属性再删掉
        chart.forEach(item => item.selected = false);
        this.setState({ chart });
        console.log('chart', this.state.chart)
    }
    selectItem (index) {
        this.setState(prevState => {
            let newChart = [ ...prevState.chart ];
            let newItem = { ...newChart[index], selected: !newChart[index].selected };
            newChart.splice(index, 1, newItem);
            return prevState.chart[index].selected ? { chart: newChart, selectAll: false } : { chart: newChart };
        })
    }
    async buyEvent() {
        let toBuy = this.state.chart.filter(item => {
            if (item.selected) {
                Reflect.deleteProperty(item, "selected");
                return item;
            }
        });
        if(toBuy.length) {
            this.props.updateToBuy(toBuy);
            this.props.history.push('/buy');
        } else {
            Toast.info("请选择要购买的图书");
        }
    }
    back() {
        this.props.history.goBack();
    }
    selectAllHandler () {
        let chart = [ ...this.state.chart ];
        let flag = true;
        if (!chart.filter(item => !item.selected).length) {
            flag = false;
        }
        chart.forEach(item => item.selected = flag);
        this.setState(prevState => ({ selectAll: !prevState.selectAll, chart }));
    }
    async del() {
        let delBooks = this.state.chart.filter(item => {
            if (item.selected) {
                Reflect.deleteProperty(item, "selected");
                return item;
            }
        });
        await this.props.updateChartAsync({ book: JSON.stringify(delBooks) });
        this.setState({ chart: this.props.chart });
    }
    render() {
        return (
            <>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={this.back.bind(this)}
                    className="nav"
                >图书商城</NavBar>
                <div className="chart">
                    <div className="top-buttons">
                        <div className="select-all" onClick={this.selectAllHandler.bind(this)}>
                            <div className={["checkbox",  this.state.selectAll ? "selected" : ""].join(" ")} ></div>
                            <span>全选</span>
                        </div>
                        <div onClick={this.del.bind(this)}>删除</div>
                    </div>
                    {
                        this.state.chart.map((item, index) => {
                            return (
                                <div className="card" key={index} onClick={this.selectItem.bind(this, index)}>
                                    <div className="img-name-price">
                                        <img src={item.img} alt="" />
                                        <div className="bookname-price">
                                            <div className="bookname">{item.bookname}</div>
                                            <div className="price">￥{item.bookprice}</div>
                                        </div>
                                    </div>
                                    <div className="bottom-line">
                                    <div className={item.selected ? "checkbox selected" : "checkbox"}></div>
                                    <div className="num">数量：{item.count}</div>
                                    </div>
                                    
                                </div>
                            );
                        })
                    }
                    <footer>
                        <button onClick={this.buyEvent.bind(this)}>立即购买</button>
                        <button onClick={this.back.bind(this)}>返回</button>
                    </footer>
                </div>
            </>
        );
    }
}
export default connect(
    (state) => ({ chart: state.chart.data, bookdetail: state.bookdetail }),
    { changeBookDetail, updateChartAsync, updateToBuy }
)(Chart);