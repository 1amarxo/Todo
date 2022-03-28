using Core.Entities;
using Infrastucture;
using Presentation.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.Services
{
    public class FolderService
    {
        private readonly ToDoListAppDBContext context;

        public FolderService(ToDoListAppDBContext context)
        {
            this.context = context;
        }
        public  void AddFolder(FolderVM folderVM)
        {
            var folder = new Folder()
            {
                Title = folderVM.Title,
                UserId = folderVM.UserId,
                Date = folderVM.Date
            };

            context.Folders.Add(folder);
            context.SaveChangesAsync();
        }
        public Folder GetById(string id)
        {
            var item = context.Folders.Find(id);
            return item;
        }
        public IEnumerable<Folder> GetFolderWithUserId(string id)
        {
            return context.Folders.Where(x => x.UserId == id).OrderByDescending(x => x.Date).ToList();

        }


    }
}
