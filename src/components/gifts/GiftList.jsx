import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { DataTable, ShowDialog, CustomDialog } from '../../controls'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import { giftActions } from '../../actions'
import moment from 'moment'
import { defaultValues } from '../helper'
import { Container, TitleDiv } from '../part'
import { Search } from '../../controls'

/**
 * 卡券列表
 */
class GiftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenDialog: false,
            rows: [],
            totalCount: 0,
            giftTypes: [],
            currentGift: null,
            searchCondition: {
                giftId: null,
                activeName: null,
                giftType: 0,
                giftState: 0,
                isEnabled: true,
                isDel: false,
                pageIndex: 1,
                pageSize: 10,
                startTime: '0001-01-01',
                endTime: moment().format('YYYY-MM-DD'),
            }
        };
    }

    renderHeader = () => <TableRow>
        <TableCell>卡券编号</TableCell>
        <TableCell>卡券名称</TableCell>
        <TableCell>卡券简述</TableCell>
        <TableCell>卡券类型</TableCell>
        <TableCell>卡券面值</TableCell>
        <TableCell>活动名称</TableCell>
        <TableCell>添加人员</TableCell>
        <TableCell>添加时间</TableCell>
        <TableCell>操作</TableCell>
    </TableRow>

    getGiftState = state => state === 0 ? "全部" : state === 2 ? "已上架" : "未上架";

    renderRow = row => <TableRow key={row.giftId}>
        <TableCell>{row.giftId}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{this.state.giftTypes.find(x => x.value === row.giftType).name}</TableCell>
        <TableCell>{row.giftValue}</TableCell>
        <TableCell>{row.activeName}</TableCell>
        {/* <TableCell>{this.getTaskState(row.taskState)}</TableCell> */}
        <TableCell>{row.operator}</TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>
            <div style={{ display: 'flex' }}>
                <Button size="small" color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: row })}>详情</Button>
            </div>
        </TableCell>
    </TableRow>

    renderTitle = () => <div style={{ width: '100%', textAlign: 'left' ,marginBottom:15}}>
        <TitleDiv style={{marginBottom:15}}>
            <div>{'任务列表'}</div>
            <div style={{ display: 'flex' }}>
                <Button color="primary" onClick={() => this.setState({ isOpenDialog: true, currentGift: defaultValues.task })}>添加</Button>
            </div>
        </TitleDiv>
        <Search  />
    </div>

    onCommit = task => {
        const { platformId, startTime, endTime, pageIndex, pageSize } = this.state;
        this.setState({ isOpenDialog: false, currentGift: null });
        // this.props.dispatch(taskActions.addOrUpateTask(task, { platformId, startTime, endTime, pageIndex, pageSize }));
    }

    onPageIndexChange = (event, idx) => {
        const { searchCondition } = this.state;
        if (searchCondition.pageIndex !== idx + 1) {
            searchCondition.pageIndex = idx + 1;
            this.setState({ searchCondition });
            this.props.dispatch(giftActions.getGifts({ ...searchCondition }));
        }
    };

    onPageSizeChange = event => {

        const { searchCondition } = this.state;
        searchCondition.pageIndex = 1;
        searchCondition.pageSize = event.target.value;
        this.setState({ searchCondition })
        this.props.dispatch(giftActions.getGifts({ ...searchCondition }));
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { searchCondition } = this.state;
        dispatch(giftActions.getGifts({ ...searchCondition }));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps != null) {
            const { giftTypes, alertMessage, totalCount, gifts } = nextProps;
            console.log(nextProps);
            this.setState({ giftTypes, alertMessage, totalCount, rows: gifts });
        }
    }

    render() {
        const { giftTypes, rows, searchCondition, totalCount, currentGift, isOpenDialog } = this.state;
        const { pageSize, pageIndex } = searchCondition;

        return <React.Fragment>
            <ShowDialog alertMessage={this.props.alertMessage} />
            {/* <CustomDialog
                onClose={() => this.setState({ isOpenDialog: false })}
                isOpen={isOpenDialog === true}
                title={currentGift == null ? '' : currentGift.giftId != null ? '修改卡券' : '新建卡券'} >
                <Task task={currentGift} platforms={platforms} taskTags={taskTags} onCommit={this.onCommit} />

             
            </CustomDialog> */}


            <Container title={this.renderTitle()} >

                <DataTable
                    rows={rows}
                    pageSize={pageSize}
                    pageIndex={pageIndex - 1}
                    totalCount={totalCount}
                    onPageIndexChange={this.onPageIndexChange}
                    onPageSizeChange={this.onPageSizeChange}
                    renderHeader={this.renderHeader}
                    renderRow={this.renderRow}
                    needPagination={true}>
                </DataTable>


            </Container>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => { return { ...state.location, ...state.gift }; }

const instance = withRouter(connect(mapStateToProps)(GiftList));

export { instance as GiftList };
