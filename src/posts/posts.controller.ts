import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    // Injecting postsService
    private readonly postsService: PostsService,
  ) {}

  @Get('{/:userId}')
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(typeof createPostDto);
    console.log(createPostDto);
    return 'You sent a post request to posts endpoint';
  }
}
