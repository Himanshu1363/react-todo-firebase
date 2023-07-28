import React from 'react'
import styles from '../css/Todo.module.css'

const todo = (props) => {
  return (
    <div className={styles.todoFlex}>
      <input type='checkbox' className={styles.taskDone}></input>
         <p>{props.title}</p>
    </div>
  )
}

export default todo