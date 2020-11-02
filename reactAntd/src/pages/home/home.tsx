import React,{Component} from 'react';
import { Carousel } from 'antd';
import { Card, Statistic, Row, Col,Calendar  } from 'antd';
import './home.less';
import LoadingBox from '../../common/components/loadingBox/loadingBox';
class Home extends Component{
    constructor(props) {
        super(props);
        console.log(props);
    }
    state = {
        key: 'tab1',
    };

    onTabChange = (key, type?) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {
        let arr = [1,2,3,4,5];
        const tabList = [
            {
                key: 'tab1',
                tab: '统计',
            },
            {
                key: 'tab2',
                tab: '日历',
            },
        ];
        const { Countdown } = Statistic;
        const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

        const contentList = {
            tab1: <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Countdown title="Countdown" value={deadline} />
                    </Col>
                    <Col span={12}>
                        <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
                    </Col>
                    <Col span={24} style={{ marginTop: 32 }}>
                        <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
                    </Col>
                </Row>
            </div>,
            tab2: <div>
                <div className="site-calendar-demo-card">
                    <Calendar fullscreen={false} onPanelChange={e=>{console.log('site')}} />
                </div>
            </div>,
        };
        return (
            <div className="home">
                <section className="banner">
                    <Carousel autoplay>
                        {
                            arr.map((item,key)=>{
                                return <div key={key}>{item}</div>
                            })
                        }
                    </Carousel>
                </section>

                <section className="">
                    <Card
                        style={{ width: '100%' }}
                        title="Card标题"
                        tabList={tabList}
                        activeTabKey={this.state.key}
                        onTabChange={key => {
                            this.onTabChange(key,'key');
                        }}
                    >
                        {contentList[this.state.key]}
                    </Card>
                </section>
            </div>
        );
    };
};
export default Home;

