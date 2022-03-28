using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Entities
{
    [Table("ToDoTag")]
    public class ToDoTag
    {
        public string Id { get; set; }
        public string ToDoId { get; set; }
        public virtual ToDo ToDo { get; set; }
        public string TagId { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
