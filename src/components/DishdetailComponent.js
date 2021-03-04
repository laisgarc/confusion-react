/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, 
        Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors} from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            showModal: false
        };
    }

    handleSubmit(values) {
        this.setState({showModal: false})
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {
      return (
        <>
            <Button outline color="secondary" onClick={() => this.setState({showModal: true})}>
                <span className="fa fa-pencil fa-lg"></span> Submit comment
            </Button>
            <Modal isOpen={this.state.showModal} fade = {false} toggle={() => this.setState({showModal: false})}>
                <ModalHeader toggle={() => this.setState({showModal: false})}>Submit comment</ModalHeader>
                <ModalBody>   
                <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select
                                        type="number"
                                        model=".rating"
                                        placeholder="1"
                                        validateOn="blur"
                                        className="form-control"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{  minLength: minLength(3), maxLength: maxLength(15)}}
                                        validateOn="blur"
                                    />
                                    <Errors
                                      className="text-danger"
                                      model=".author"
                                      show="touched"
                                      messages={{
                                        maxLength: 'Must be 15 characters or less',
                                        minLength: 'Must be at least 3 characters'
                                      }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" color="info">Submit</Button>
                        </Form>                    
                </ModalBody>
            </Modal>
        </>
      );
    }
  }

    function RenderDishDetails({dish}) {
        if (dish != null || dish !== undefined){
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments, postComment, dishId}) {
        if(comments != null || comments !== undefined){
            return(
                <div className="col-12 col-md-5 m-1"> 
                    <h1>Comments:</h1> 
                    <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                    </ul>
                    <ul>
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </ul> 
                </div>   
            );
        }
        else
        return(<div></div>);
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDishDetails dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                </div>
                </div>
        )}
        else {
           return(<div></div>)
        }
    }

export default DishDetail;