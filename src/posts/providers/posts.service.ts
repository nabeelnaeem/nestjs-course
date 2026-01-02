import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  /**
   * Injecting user service, post and metaOption repository
   */
  constructor(
    private readonly usersService: UsersService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * creating new posts
   */

  public async create(@Body() createPostDto: CreatePostDto) {
    const { metaOptions, ...postData } = createPostDto;

    // Create metaOptions
    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }
    // CreatePost
    let post = this.postsRepository.create({
      ...postData,
      metaOptions: metaOptions ?? undefined,
    });

    // Return the post to user
    return await this.postsRepository.save(post);
  }

  public findAll(userId: string) {
    //Users service
    //Find a user
    //return posts

    const user = this.usersService.findOneById(userId);

    return [
      {
        user,
        title: 'Test Title 1',
        content: 'Test Content 1',
      },
      {
        user,
        title: 'Test Title 2',
        content: 'Test Content 2',
      },
    ];
  }
}
