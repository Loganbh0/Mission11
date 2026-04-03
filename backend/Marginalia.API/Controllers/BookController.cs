using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Marginalia.API.Data;

namespace Marginalia.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;

        public BookController(BookDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpGet("paged")]
        public async Task<ActionResult<PagedBooksResponse>> GetPagedBooks(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5,
            [FromQuery] string sortBy = "id",
            [FromQuery] string? category = null)
        {
            if (page < 1)
            {
                page = 1;
            }

            if (pageSize != 5 && pageSize != 10 && pageSize != 20)
            {
                pageSize = 5;
            }

            IQueryable<Book> query = _context.Books;

            if (!string.IsNullOrWhiteSpace(category))
            {
                var categoryTrimmed = category.Trim();
                query = query.Where(b => b.Category == categoryTrimmed);
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            if (totalPages > 0 && page > totalPages)
            {
                page = totalPages;
            }

            if (sortBy != "id" && sortBy != "title")
            {
                sortBy = "id";
            }

            IQueryable<Book> orderedQuery = sortBy == "title"
                ? query.OrderBy(b => b.Title).ThenBy(b => b.BookId)
                : query.OrderBy(b => b.BookId);

            var items = await orderedQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedBooksResponse
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = totalPages
            };
        }

        [HttpGet("categories")]
        public async Task<ActionResult<List<string>>> GetCategories()
        {
            var categories = await _context.Books
                .Select(b => b.Category)
                .Distinct()
                .OrderBy(c => c)
                .ToListAsync();

            return categories;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        [HttpPost("AddBook")]
        public async Task<ActionResult<Book>> AddBook([FromBody] Book? newBook)
        {
            if (newBook == null)
            {
                return BadRequest("Request body could not be parsed as a book.");
            }

            newBook.BookId = 0;
            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public async Task<ActionResult<Book>> UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existing = await _context.Books.FindAsync(bookId);
            if (existing == null)
            {
                return NotFound("Book not found");
            }

            existing.Title = updatedBook.Title;
            existing.Author = updatedBook.Author;
            existing.Publisher = updatedBook.Publisher;
            existing.ISBN = updatedBook.ISBN;
            existing.Classification = updatedBook.Classification;
            existing.Category = updatedBook.Category;
            existing.PageCount = updatedBook.PageCount;
            existing.Price = updatedBook.Price;

            _context.Books.Update(existing);
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public async Task<IActionResult> DeleteBook(int bookId)
        {
            var existing = await _context.Books.FindAsync(bookId);
            if (existing == null)
            {
                return NotFound("Book not found");
            }

            _context.Books.Remove(existing);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
