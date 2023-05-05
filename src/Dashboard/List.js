import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost, getPosts } from '../actions/postActions';
import { Reactions } from './Reactions';
import {useDistpatch, useSelector} from 'react-redux';

const List = ({ items, removeItem, editItem }) => {
  // const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  console.log(auth)

  return (
    <div className='post-list'>
      {items.map((item) => { 
        const { _id, text, name } = item;
       
        return (
          <article className='post-item' key={_id}>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(_id)}
              >
                Edit
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(_id)}
              >
                Delete
              </button>
            </div>
            <p className='username'>User name:{auth.user.username}</p>
            <p className='title'>Post:{text}</p>
            <Reactions />
          </article>
        );
      })}
    </div>
  );
};
// List.propTypes = {
//   posts: PropTypes.array.isRequired
// }
// export default List;


List.propTypes = {
  // errors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}



const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  post: state.post
})
export default connect(mapStateToProps, {addPost ,getPosts}) (List);