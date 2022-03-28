using Core.Entities;
using Infrastucture;
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
    [Route("api/v1/[controller]")]
    [Produces("application/json")]
    public class FolderController : ControllerBase
    {

        private readonly FolderService folderService;
        public FolderController(FolderService folderService)
        {
            this.folderService = folderService;
        }
        [HttpGet]
        [Route("ping")]
        public IActionResult Ping()
        {
            return Ok("ping");
        }

        [Authorize]
        [HttpGet]
        [Route("")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<Folder>> GetAll(string userId)
        {
            var folders = folderService.GetFolderWithUserId(userId);
            return Ok(folders);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Folder> GetById(string id)
        {
            try
            {
                return Ok(folderService.GetById(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        [Route("add")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public  ActionResult<FolderVM> Create(FolderVM folder)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            try
            {

                folderService.AddFolder(folder);
            }
            catch (Exception ex)
            {
                  return BadRequest();
            }
              return Created($"/api/v1/folders/{folder}", folder);
        }

        //[HttpPut]
        //[Route("{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public ActionResult<Folder> Update(string id, Folder folder)
        //{
        //    if (id == null || folder == null || id != folder.Id)
        //        return BadRequest();
        //    try
        //    {
        //        context.Folders.Update(folder);
        //        context.SaveChanges();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest();
        //    }
        //    return Ok(folder);
        //}
    }
}
