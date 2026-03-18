using System.Collections.Generic;

namespace Marginalia.API.Data
{
    public class PagedBooksResponse
    {
        public List<Book> Items { get; set; } = new();
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}

