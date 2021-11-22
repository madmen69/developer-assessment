using Microsoft.AspNetCore.Http;
using System.Net;
using System;
using System.Threading.Tasks;
using TodoList.Api.Models;


namespace TodoList.Api.CustomExceptions
{
    public class ValidationException : Exception 
    {
        public ValidationException(string errorMessage) :
            base(errorMessage)
        {
    
        }

        public HttpStatusCode Code => HttpStatusCode.BadRequest;
    }

    public class TodoItemNotFoundException : Exception 
    {
         public TodoItemNotFoundException() :
            base("Not found item")
        {
    
        }

        public HttpStatusCode Code => HttpStatusCode.NotFound;
    }
}