/**
 * Created by Bilanych on 30.09.2016.
 */
import React, {Component} from 'react'
import {styles} from '../constants/UserDetailsConstants'
import {connect} from 'react-redux'
import {Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn}
    from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import {Popover,OverlayTrigger} from 'react-bootstrap';
class UserTable extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        var toolTipDescription;
        var res = this.props.events.map((main_event)=>{
            if(main_event.uuid===this.props.event_uuid){
                return main_event.sessions.map((child_event)=>{
                    return this.props.sessions_cache.map((uuid)=>{
                        if(uuid===child_event.uuid){
                            toolTipDescription = child_event.description;
                            return (
                                <TableRow >
                                    <TableRowColumn  style={{textAlign: 'center'}} >
                                        <OverlayTrigger
                                            trigger={['hover', 'focus']}
                                            placement="top"
                                            overlay={
                                                <Popover id="popover-trigger-hover-focus" title="There Full Data">
                                                    <strong>{child_event.uuid}</strong>
                                                </Popover>
                                            }
                                        >
                                            <text>{child_event.uuid}</text>
                                        </OverlayTrigger>
                                    </TableRowColumn>
                                    <TableRowColumn  style={{textAlign: 'center'}}>
                                        <Chip style={styles.chip}>
                                            {child_event.name}
                                        </Chip>
                                    </TableRowColumn>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="top"
                                        overlay={
                                            <Popover id="popover-trigger-hover-focus" title="There Full Data">
                                                <strong>{toolTipDescription}</strong>
                                            </Popover>
                                        }
                                    >
                                        <TableRowColumn style={{textAlign: 'center'}}>
                                            {child_event.description}
                                        </TableRowColumn></OverlayTrigger>
                                    <TableRowColumn  style={{textAlign: 'center'}}>
                                        <DatePicker id="start_data" style={{margin: 10}} disabled={true} defaultDate={new Date(child_event.start_date)}/>
                                    </TableRowColumn>
                                    <TableRowColumn  style={{textAlign: 'center'}}>
                                        <DatePicker id="end_data" style={{margin: 10}} disabled={true} defaultDate={new Date(child_event.end_date)}/>
                                    </TableRowColumn>
                                </TableRow>
                            )
                        }
                    })
                })
            }
        });

        return(
            <Table height={'inherit'}>
                <TableHeader adjustForCheckbox={false}>
                    <TableRow style={{textAlign: 'center'}}>
                        <TableHeaderColumn tooltip="The ID" style={{textAlign: 'center'}}>ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The NAME" style={{textAlign: 'center'}}>Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The STATUS" style={{textAlign: 'center'}}>Description</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The START DATA" style={{textAlign: 'center'}}>Start Data</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The END DATA" style={{textAlign: 'center'}}>End Data</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {res}
                </TableBody>
            </Table>
        )
    }
}
export default connect()(UserTable)
