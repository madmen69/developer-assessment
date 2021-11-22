using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TodoList.Api.Models;
using TodoList.Api.CustomExceptions;

namespace TodoList.Api.TodoItems
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        
        ITodoItemsService _service;

        public TodoItemsController(ITodoItemsService service)
        {
            _service = service;
        }

        /// <summary>
        /// Gets all incomplete todoItem.
        /// </summary>
        /// <returns>TodoItems</returns>
        /// <response code="200">Returns OK</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTodoItems()
        {
            var results = await _service.GetAll();
            return Ok(results);
        }

        /// <summary>
        /// Gets a specific todoItem.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>TodoItem</returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="404">If the item is not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTodoItem(Guid id)
        {
            var result = await _service.GetTodoItem(id);
            return Ok(result);
        }

        // PUT: api/TodoItems/... 
        [HttpPut("{id}")]
        /// <response code="200">Returns the newly created item</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutTodoItem(Guid id, TodoItem todoItem)
        {
             try {
                var result = await _service.UpdateTodoItem(id, todoItem);
            }
            catch(TodoItemNotFoundException ex) {
                return NotFound(ex.Message);
            }
           
            return Ok();
        } 

        /// <summary>
        /// Creates a TodoItem.
        /// </summary>
        /// <param name="item"></param>
        /// <returns>A newly created TodoItem</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "description": "Do laundry",
        ///        "isComplete": false
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created item</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostTodoItem(TodoItem todoItem)
        {
            try {
                var result = await _service.CreateTodoItem(todoItem);
            }
            catch(ValidationException ex) {
                return BadRequest(ex.Message);
            }
            
            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }
    }
}
