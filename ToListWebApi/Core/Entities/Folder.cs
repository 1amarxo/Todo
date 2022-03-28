using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Entities
{
    public class Folder
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }

        
        //Navigation Props
        public string UserId { get; set; }
        public virtual List<ToDo> Todo { get; set; }
    }
}
