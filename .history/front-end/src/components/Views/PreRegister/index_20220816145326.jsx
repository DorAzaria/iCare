import './index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '@contexts/App';
import ShellMainGate  from '@components/Shells/MainGate';
import { Container, Row, Col } from 'reactstrap';


class PreViewRegister extends React.Component {
    static contextType = AppContext;

    render () {
        const { context } = this;

        const { strings } = context;
        const titleRegister = strings['TITLE_REGISTER'];

        const body = (
            
            <Container>
            <div style={{padding: '25px'}}>
            <Link className="ShellMainGate_headTitle" to="/">
              <img alt = "iCare" src = "logo.png" style = {{marginLeft:-33 ,width:215, height:110}}/>
            </Link>   
            </div>
                <Row className='justify-content-md-center'>
                    <div className="ViewLogInMainGate" style={{padding: '25px'}}>
                        <div className="ViewLogInMainGate_title">
                            <span className="Title_styleA">{ titleRegister }
                        
                            </span>
                        </div>
                        <Row className='mt-5'>
                            <Col sm={6} className='text-center'>
                                <div>
                                    <img alt = "iCare" src = "mother.png" style = {{marginTop:-20,height:150}}/>
                                </div>
                                <div>
                                    <Link className="ShellMainGate_headTitle" to="/parent-register">
                                        <button type='button' className='btn btn-pre-register' style={{marginTop:10,minWidth: '150px'}}>Parent</button>
                                    </Link> 
                                </div>
                                
                            </Col>
                            <Col sm={6} className='text-center'>
                                <div>
                                    <img alt = "iCare" src = "babysitter.png" style = {{marginTop:-20,height:150}}/>
                                </div>
                                <div>
                                    <Link className="ShellMainGate_headTitle" to="/babysitter-register">
                                        <button type='button' className='btn btn-pre-register' style={{marginTop:10,minWidth: '150px'}}>Babysitter</button>
                                    </Link> 
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>
        );
        return (<ShellMainGate body={ body }/>);
    }
}

export default PreViewRegister;