using Core.Entities;
using Infrastucture;
using Microsoft.EntityFrameworkCore;
using Presentation.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Services
{
    public class ToDoService
    {
        private readonly ToDoListAppDBContext context;

        public ToDoService(ToDoListAppDBContext context)
        {
            this.context = context;
        }

        public async Task AddToDoAsync(ToDoVM toDoVM)
        {
            var todo = new ToDo()
            {
                Id = toDoVM.Id,
                Description = toDoVM.Discription,
                FolderId=toDoVM.FolderId,
                Name=toDoVM.Name,
                IsDone = toDoVM.IsDone,
                Date = toDoVM.Date,
                Priority = toDoVM.Priority,
                
            };

            context.ToDoList.Add(todo);
            await context.SaveChangesAsync();

            foreach (var item in toDoVM.TagId)
            {
                var todotag = new ToDoTag()
                {
                    ToDoId = todo.Id,
                    TagId = item
                };

                context.ToDoListTags.Add(todotag);
                await context.SaveChangesAsync();
            }


        }

        public async Task UpdateTagsInToDoList(string toDoId, string[] tags)
        {
            var list = await context.ToDoListTags.Where(x => x.ToDoId == toDoId).ToListAsync();
            context.ToDoListTags.RemoveRange(list);
            context.ToDoListTags.AddRange(tags.Select(x => new ToDoTag { ToDoId = toDoId, TagId =x}));

            await context.SaveChangesAsync();
        }


        
        public async Task<ToDoAndTagVM> FindToDoListByIdAsync(string id)
        {
            // return await context.ToDoList.Where(x => x.id == id).FirstOrDefaultAsync();
            var todo = context.ToDoList.Where(n => n.Id == id).Select(toDoAndTagVM => new ToDoAndTagVM()
            {
                Date = toDoAndTagVM.Date,
                Discription = toDoAndTagVM.Description,
                FolderId = toDoAndTagVM.FolderId,
                Name = toDoAndTagVM.Name,
                IsDone = toDoAndTagVM.IsDone,
                Priority = toDoAndTagVM.Priority,
                TagName = toDoAndTagVM.ToDoTags.Select(n => n.Tag.Name).ToList()
            }).FirstOrDefault();

            return todo;
        }

        public async Task<List<ToDoAndTagVM>> GetAll()
        {
            return await context.ToDoList.Select(toDoAndTagVM => new ToDoAndTagVM()
            {
                Id=toDoAndTagVM.Id,
                Date = toDoAndTagVM.Date,
                Discription = toDoAndTagVM.Description,
                FolderId = toDoAndTagVM.FolderId,
                Name = toDoAndTagVM.Name,
                IsDone = toDoAndTagVM.IsDone,
                Priority = toDoAndTagVM.Priority,
                TagName = toDoAndTagVM.ToDoTags.Select(n => n.Tag.Name).ToList()
            }).ToListAsync();
        }

        public async Task DeleteToDoAsync(string id)
        {
            var todo = context.ToDoList.FirstOrDefault(p => p.Id == id);

            var todoTag = context.ToDoListTags.FirstOrDefault(p => p.ToDoId == id);
            if (todoTag!=null)
            {
                context.ToDoListTags.Remove(todoTag);
            }

            context.ToDoList.Remove(todo);

            await context.SaveChangesAsync();
        }

        public List<ToDo> GetAllByFolderId(string Id)
        {
            return context.ToDoList.Where(x => x.FolderId == Id).ToList();
        }
        public void Update(string id, ToDoVM toDoVM)
        {
            var todo = new ToDo()
            {
                Id = toDoVM.Id,
                Description = toDoVM.Discription,
                FolderId = toDoVM.FolderId,
                Name = toDoVM.Name,
                IsDone = toDoVM.IsDone,
                Date = toDoVM.Date,
                Priority = toDoVM.Priority
            };

            context.ToDoList.Update(todo);
            context.SaveChanges();
        }
    }
}
