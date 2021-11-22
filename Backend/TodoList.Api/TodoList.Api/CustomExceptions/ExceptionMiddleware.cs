using Microsoft.AspNetCore.Http;
using System.Net;
using System;
using System.Threading.Tasks;
using TodoList.Api.Models;
using Microsoft.Extensions.Logging;


namespace TodoList.Api.CustomExceptions
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsJsonAsync(new { Message = " Why are you not working?? " });
            }
        }
    }
}