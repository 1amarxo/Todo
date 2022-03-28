using Core.Entities;
using Infrastucture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class TagController : ControllerBase
    {
        private readonly ToDoListAppDBContext context;

        public TagController(ToDoListAppDBContext context)
        {
            this.context = context;
        }


        [HttpPost]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddToDoWithTags(TagVM tagVM)
        {
            var tag = new Tag()
            {
                Name = tagVM.Name
            };
            context.Tags.Add(tag);
            context.SaveChanges();
            return Ok(tagVM.Name);
        }


        [HttpGet]
        [Route("/api/v1/Tag/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetById(string id)
        {
            var tag = context.Tags.Where(n => n.Id == id).Select(todoVM => new TagAndToDoVM()
            {
                Name = todoVM.Name
            });

            return Ok(tag);
        }


        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Tag>> GetAll()
        {
            return Ok(context.Tags.ToList());
        }


        [HttpDelete]
        [Route("/api/v1/Tag/{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult Delete(string id)
        {
            var todo = context.Tags.FirstOrDefault(p => p.Id == id);
            if (todo == null)
                return BadRequest();
            try
            {
                context.Tags.Remove(todo);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            context.SaveChanges();
            return Ok();

        }
    }
}
