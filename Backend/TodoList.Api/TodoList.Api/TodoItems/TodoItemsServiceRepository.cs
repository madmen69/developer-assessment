using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TodoList.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoList.Api.TodoItems
{
    public interface ITodoItemsRepository
    {
        Task<IEnumerable<TodoItem>> GetAll(Expression<Func<TodoItem, bool>> match);
        Task<TodoItem> GetTodoItem(Guid id);
        Task<TodoItem> UpdateTodoItem(Guid id, TodoItem item);
        Task<TodoItem> CreateTodoItem(TodoItem item);
    }


    public class TodoItemsRepository : ITodoItemsRepository  
    {  
        #region Property  
        private readonly TodoContext _context;
        #endregion  

        #region Constructor  
        public TodoItemsRepository(TodoContext context)  
        {  
            _context = context;  
        }  
        #endregion  

        public async Task<IEnumerable<TodoItem>> GetAll(Expression<Func<TodoItem, bool>> match) 
        {
            return await _context.Set<TodoItem>().Where(match).ToListAsync();
        }
        public async Task<TodoItem> GetTodoItem(Guid id) 
        {
            return await _context.TodoItems.FindAsync(id);
        }
        public async Task<TodoItem> UpdateTodoItem(Guid id, TodoItem item) 
        {
            var existing = await _context.Set<TodoItem>().FindAsync(id);
            if(existing != null) {
                _context.Entry(existing).CurrentValues.SetValues(item);
                await _context.SaveChangesAsync();
            }

            return existing;
        }
        public async Task<TodoItem> CreateTodoItem(TodoItem item)
        {
             _context.Set<TodoItem>().Add(item);
            await _context.SaveChangesAsync();
            return item;
        }
    }  
    
}
