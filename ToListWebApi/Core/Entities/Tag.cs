using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Entities
{
    [Table("Tags")]
    public class Tag
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public virtual IEnumerable<ToDoTag> ToDoTags { get; set; }
    }
}
