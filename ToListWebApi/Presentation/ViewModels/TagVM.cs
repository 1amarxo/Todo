using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presentation.ViewModels
{
    public class TagVM
    {
        public string Name { get; set; }
    }
    public class TagAndToDoVM
    {
        public string Name { get; set; }
        public List<string> ToDoDiscription { get; set; }
    }
}
