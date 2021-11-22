using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Api.Models;
using TodoList.Api.CustomExceptions;
using TodoList.Api.Validations;

namespace TodoList.Api.TodoItems
{
    public interface ITodoItemsService
    {
        Task<IEnumerable<TodoItem>> GetAll();
        Task<TodoItem> GetTodoItem(Guid id);
        Task<TodoItem> UpdateTodoItem(Guid id, TodoItem item);
        Task<TodoItem> CreateTodoItem(TodoItem item);
    }

    public class TodoItemsService : ITodoItemsService  
    {  
        #region Property  
        private readonly ITodoItemsRepository _repository;
        #endregion  

        #region Constructor  
        public TodoItemsService(ITodoItemsRepository repository)  
        {  
            _repository = repository;  
        }  
        #endregion  

        public async Task<IEnumerable<TodoItem>> GetAll() 
        {
            return await _repository.GetAll( item => item.IsCompleted != true);
        }
        public async Task<TodoItem> GetTodoItem(Guid id) 
        {
            return await _repository.GetTodoItem(id);
        }
        public async Task<TodoItem> UpdateTodoItem(Guid id, TodoItem item) 
        {
            var result = await _repository.GetTodoItem(item.Id).ConfigureAwait(false);
            if (result == null )
            {
                throw new TodoItemNotFoundException();
            }

            return await _repository.UpdateTodoItem(id, item);   
        }
        public async Task<TodoItem> CreateTodoItem(TodoItem item)
        {

            var validationResult = new TodoItemValidation().Validate(item);
            if (!validationResult.IsValid)
            {
                var message = validationResult.Errors.FirstOrDefault(x => x.ErrorMessage != null).ErrorMessage;
                 throw new ValidationException(message);
            }

            var result = await _repository.GetTodoItem(item.Id).ConfigureAwait(false);
            if (result != null )
            {
                throw new ValidationException("Todo item id is already in the list");
            }
            
            var desciptionSearch = await _repository.GetAll((a) => (a.Description.ToLowerInvariant() == item.Description.ToLowerInvariant()) && !a.IsCompleted).ConfigureAwait(false);
            if(desciptionSearch.Count() > 0) {
                throw new ValidationException("Todo item description is already in the list");
            }

            

            return await _repository.CreateTodoItem(item);
        }
    }
}
