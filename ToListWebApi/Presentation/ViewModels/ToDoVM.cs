using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.ViewModels
{
    public class ToDoVM
    {

        public string Id { get; set; }
        public string Discription { set; get; }
        public bool IsDone { set; get; }
        public string Name { get; set; }
        
        public DateTime Date { set; get; }
        public Priority Priority { set; get; }

        public string FolderId { get; set; }
        public List<string> TagId { get; set; }
    }

    public class ToDoAndTagVM
    {
        public string Id { get; set; }
        public string Discription { set; get; }
        public bool IsDone { set; get; }
        public string Name { get; set; }
        public DateTime Date { set; get; }
        public Priority Priority { set; get; }

        public string FolderId { get; set; }
        public List<string> TagName { get; set; }

    }
}
