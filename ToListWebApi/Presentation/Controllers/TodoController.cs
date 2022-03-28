using Core.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presentation.Services;
using Presentation.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    [Produces("application/json")]
    public class TodoController : ControllerBase
    {
        private readonly ToDoService toDoService;
        public TodoController(ToDoService toDoService)
        {
            this.toDoService = toDoService;
        }

        // GET: api/v1/todolist/
        [HttpGet]
        [Route("all")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ToDo>>> GetAll()
        {
            return Ok(await toDoService.GetAll());
        }

        // GET: api/v1/todolist/{id}
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ToDoVM>> GetById(string id)
        {
            if (String.IsNullOrEmpty(id))
                return BadRequest();
            var toDo = await toDoService.FindToDoListByIdAsync(id);
            if (toDo == null)
                return NotFound();
            return Ok(toDo);
        }

        // POST: api/v1/todolist 
        [HttpPost]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> Create([FromBody] ToDoVM toDo)
        {
            await toDoService.AddToDoAsync(toDo);
            return Ok(toDo);
        }

        // DELETE: api/v1/persons/{id}
        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Delete(string id)
        {

            try
            {
                await toDoService.DeleteToDoAsync(id);

            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return NoContent();
        }


        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<ToDoVM>> GetAll(string folderId)
        {
            List<ToDo> todo = new  List<ToDo>();
            List<ToDoVM> toDoVM=new List<ToDoVM>();
            List<string> tagId=new List<string>() { " 6FB8EFBB - CA6D - 44C3 - BDF5 - 6FB7D95FC384" };
            todo=toDoService.GetAllByFolderId(folderId);
            foreach( var item in todo)
            {
                var toDoVMItem = new ToDoVM()
                {
                    Id = item.Id,
                    Discription = item.Description,
                    FolderId = item.FolderId,
                    Name = item.Name,
                    IsDone = item.IsDone,
                    Date = item.Date,
                    Priority = item.Priority,
                    TagId =tagId
                };

                toDoVM.Add(toDoVMItem);
            }
           


            return Ok(toDoVM);
        }
        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<ToDoVM> Update(string id, ToDoVM todo)
        {
            ToDoVM todoUpdate;
            try
            {
                toDoService.Update(id,todo);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
