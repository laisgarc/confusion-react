import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDishDetails({dish}) {
        if (dish != null || dish !== undefined){
            return(
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        }
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments}) {
        console.log()
        if(comments != null || comments !== undefined){
            const list = comments.map((comment) => { 
                return ( 
                    <div key={comment.id}> 
                        <ul>{comment.comment}</ul> 
                        <ul>--{comment.author} 
                            {new Intl.DateTimeFormat('en-US', 
                            { year: 'numeric', month: 'short', day: '2-digit'
                            }).format(comment.date.toLocaleDateString)}
                        </ul>
                    </div>
                ); 
            });
            return(
                <div> 
                    <h1>Comments:</h1> 
                    {list} 
                </div>   
            );
        }
        else
        return(<div></div>);
    }

    const DishDetail = (props) => {
        if(props.dish != null){
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
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
        )}
        else {
           return(<div></div>)
        }
    }

export default DishDetail;