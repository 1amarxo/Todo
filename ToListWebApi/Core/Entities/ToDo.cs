using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Entities
{
    public class ToDo
    {
        public string Id { set; get; }
        public string Name { get; set; }
        public string Description { set; get; }
        public bool IsDone { set; get; }
        public DateTime Date { set; get; }
        public Priority Priority { set; get; }
        public virtual IEnumerable<ToDoTag> ToDoTags { get; set; }

        public string FolderId { get; set; }
        public virtual Folder Folder { get; set; }

    }
}
